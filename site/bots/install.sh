#!/bin/sh
# Installs spezl, the program griasdi bots run on, into ~/.local/bin:
# the newest build for this machine, checked against its SHA-256.
# Run it again to update. It installs no system packages; those are listed
# at https://griasdi.github.io/bots/#packages
#
#   curl -fsSL https://griasdi.github.io/bots/install.sh | sh

set -eu

UPDATES=https://griasdi.doodleshnookie.net/updates/

say() {
	printf '%s\n' "$*" >&2
}

die() {
	say "spezl install: $*"
	exit 1
}

main() {
	[ "$(uname -s)" = Linux ] || die "spezl runs on Linux only."

	arch=$(uname -m)
	case $arch in
	x86_64 | amd64) target=x86_64-unknown-linux-gnu ;;
	aarch64 | arm64) target=aarch64-unknown-linux-gnu ;;
	*) die "spezl is built for x86_64 and ARM64, not $arch." ;;
	esac

	glibc=$(getconf GNU_LIBC_VERSION 2>/dev/null || true)
	glibc=${glibc#glibc }
	major=${glibc%%.*}
	minor=${glibc#*.}
	minor=${minor%%.*}
	case $major$minor in
	'' | *[!0-9]*) major=0 minor=0 ;;
	esac
	if [ "$major" -lt 2 ] || { [ "$major" -eq 2 ] && [ "$minor" -lt 39 ]; }; then
		die "spezl needs glibc 2.39 or newer, as in Ubuntu 24.04, Debian 13 or Fedora 40."
	fi

	for cmd in curl tar sha256sum mktemp; do
		command -v "$cmd" >/dev/null 2>&1 || die "$cmd is missing."
	done

	manifest=
	for ch in nightly; do
		build=$(curl -fsS "${UPDATES}${ch}/latest" 2>/dev/null) || continue
		case $build in
		'' | *[!0-9]*) continue ;;
		esac
		base="${UPDATES}${ch}/${build}/"
		manifest=$(curl -fsS "${base}manifest.json" 2>/dev/null) || continue
		break
	done
	[ -n "$manifest" ] || die "No build of spezl is published yet. Try again later."

	entry=$(printf '%s' "$manifest" | tr -d ' \t\r\n' | tr '}' '\n' |
		grep '"name":"spezl"' | grep "\"target\":\"$target\"" | head -n 1 || true)
	file=$(printf '%s' "$entry" | sed -n 's/.*"file":"\([A-Za-z0-9._-]*\)".*/\1/p')
	sha=$(printf '%s' "$entry" | sed -n 's/.*"sha256":"\([0-9a-f]\{64\}\)".*/\1/p')
	[ -n "$file" ] && [ -n "$sha" ] || die "Build $build has no spezl for $arch."

	tmp=$(mktemp -d)
	trap 'rm -rf "$tmp"' EXIT
	trap 'exit 1' INT TERM

	say "Downloading spezl build $build ($file)…"
	curl -fSL --progress-bar -o "$tmp/$file" "${base}${file}"
	printf '%s  %s\n' "$sha" "$tmp/$file" | sha256sum -c --quiet - >/dev/null 2>&1 ||
		die "The download doesn’t match its SHA-256. Nothing was installed."

	prefix="$HOME/.local"
	mkdir -p "$prefix"
	tar -xzf "$tmp/$file" --strip-components=1 -C "$prefix"

	bin="$prefix/bin/spezl"
	if "$bin" --version >/dev/null 2>&1; then
		say "Installed $("$bin" --version) (build $build) to ~/.local/bin/spezl."
		started=1
	else
		missing=$(ldd "$bin" 2>/dev/null |
			sed -n 's/^[[:space:]]*\([^ ]*\) => not found$/\1/p' | tr '\n' ' ')
		say "Installed spezl to ~/.local/bin/spezl, but it can’t start yet: missing $missing"
		say "Install the system packages: https://griasdi.github.io/bots/#packages"
		started=
	fi

	# shellcheck disable=SC2088 # the literal ~ is for the reader
	case ":$PATH:" in
	*":$prefix/bin:"*) ;;
	*) say "~/.local/bin is not on your PATH. Add it with: echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.profile, then log in again." ;;
	esac

	[ -z "$started" ] || say "Next: spezl new <name>. Guide: https://griasdi.github.io/bots/"
}

main "$@"
