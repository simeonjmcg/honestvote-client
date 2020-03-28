cd ../
docker build -t jneubaum/honestvote-client:latest -f deployments/honestvote-client.Dockerfile .
docker push jneubaum/honestvote-client:latest