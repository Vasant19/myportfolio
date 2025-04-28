#!/bin/bash
# Script to update the project structure in README.md automatically

# Exit immediately if a command fails
set -e

README="README.md"
TEMP="TEMP_README.md"

# Generate fresh tree output
TREE=$(tree -I 'node_modules|.git|.svelte-kit|.vercel|dist|build')

# Prepare the replacement text (with code block formatting)
STRUCTURE="\`\`\`
$TREE
\`\`\`"

# Replace the section between <!-- START STRUCTURE --> and <!-- END STRUCTURE -->
awk -v structure="$STRUCTURE" '
  BEGIN { in_section=0 }
  /<!-- START STRUCTURE -->/ {
    print
    print structure
    in_section=1
    next
  }
  /<!-- END STRUCTURE -->/ {
    in_section=0
  }
  !in_section
' "$README" > "$TEMP"

# Move temp file back to README.md
mv "$TEMP" "$README"

echo "✅ Project structure updated in README.md!"
