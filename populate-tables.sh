#! /bin/bash
tableNames=(OnboardingTest Onboarding SomethingElse)
tableAttributeDefinitions=(Test Live Dev)

for i in ${!tableNames[@]}; do
    filteredTableCount=$(aws dynamodb list-tables --endpoint-url=http://localhost:4566 --region=eu-west-1 --output text --query "length(TableNames[?@==\`${tableNames[$i]}\`])")
    if [ $filteredTableCount == 0 ]; then
        echo "Create ${tableNames[$i]}"
        aws dynamodb create-table --attribute-definitions AttributeName=Id,AttributeType=S AttributeName=Team,AttributeType=S --table-name ${tableNames[$i]} --key-schema AttributeName=Id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --global-secondary-indexes "[{\"IndexName\": \"Team-index\",\"KeySchema\":[{\"AttributeName\":\"Team\",\"KeyType\":\"HASH\"}], \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5}, \"Projection\":{\"ProjectionType\":\"ALL\"}}]" --endpoint-url http://localhost:4566 --region=eu-west-1
    fi
done

cd data-uploader
npm run uploader