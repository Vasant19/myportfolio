#!/bin/bash
set -e

README="README.md"
TEMP="TEMP_README.md"

TREE=$(tree -I 'node_modules|.git|dist|.vercel')

STRUCTURE="\`\`\`
$TREE
\`\`\`"

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

mv "$TEMP" "$README"
echo "✅ Project structure updated in README.md!"
