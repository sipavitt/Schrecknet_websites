#!/bin/bash

# List of site directories
dirs=(
  vesperine
  police
  exhibit
  sanguine
  gallery19
  truthseeker
  cityfall
  antiques
  secondcoming
)

# Loop through each directory
for d in "${dirs[@]}"; do
    echo "Processing $d..."

    # Create the directory if it doesn't exist
    mkdir -p "$d"

    # Build the index.html content
    cat <<EOF > "$d/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>$d</title>
</head>
<body>
    <h2>$d</h2>
    <p>placeholder site</p>
</body>
</html>
EOF

    echo "Created $d/index.html"
done

echo "All placeholder sites created."
