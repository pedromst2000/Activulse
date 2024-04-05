# Function to find a suitable terminal emulator
find_terminal() {
	local terminals=("x-terminal-emulator" "gnome-terminal" "konsole" "xterm" "urxvt" "alacritty" "terminator" "mate-terminal")

	for term in "${terminals[@]}"; do
		if command -v "$term" > /dev/null; then
			echo "$term"
			return 0
		fi
	done

	return 1
}

# Get the terminal emulator command
TERMINAL=$(find_terminal)

if [ -z "$TERMINAL" ]; then
    echo "Error: No suitable terminal emulator found."
    exit 1
fi

# Navigate to the api directory
cd packages/api

# Open a new terminal window and execute "npm run dev"
$TERMINAL -e npm run dev &

# Navigate to the root directory
cd ../..

# Navigate to the web directory
cd packages/web

# Open another terminal window and execute "npm run dev:web"
$TERMINAL -e npm run dev &

# Navigate to the root directory
cd ../..

# Navigate to the app directory
cd packages/app

# Open another terminal window and execute "npm run start"
$TERMINAL -e npm start &

# Navigate to the root directory
cd ../..