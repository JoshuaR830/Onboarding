#! /bin/bash
tableNames=(OnboardingTest Onboarding SomethingElse)
tableAttributeDefinitions=(Test Live Dev)

for i in ${!tableNames[@]}; do
    filteredTableCount=$(aws dynamodb list-tables --endpoint-url=http://localhost:4566 --output text --query "length(TableNames[?@==\`${tableNames[$i]}\`])")
    if [ $filteredTableCount == 0 ]; then
        echo "Create ${tableNames[$i]}"
        aws dynamodb create-table --attribute-definitions AttributeName=${tableAttributeDefinitions[$i]},AttributeType=S --table-name ${tableNames[$i]} --key-schema AttributeName=${tableAttributeDefinitions[$i]},KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint-url http://localhost:4566
    fi
    # Run the code that imports the csv and stores in the tables
done