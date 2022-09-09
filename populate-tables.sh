#! /bin/bash
value=(OnboardingTest, NotOnboarding)

for i in ${value[@]}; do
    filteredTableCount=$(aws dynamodb list-tables --endpoint-url=http://localhost:4566 --output text --query "length(TableNames[?contains(@, 
\`$i\`) == \`true\`])")
    echo $i
    echo $filteredTableCount
done
echo "Setting up tables"
echo $variable