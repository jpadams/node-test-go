import { connect } from "@dagger.io/dagger"

connect(async (client) => {

  const dir = client.host().directory('.')

  const source = client.container()
    .from("golang:latest")
    .withMountedDirectory('/src', dir)

  const tests = source
    .withWorkdir("/src")
    .withEnvVariable("NO_CACHE", Date.now().toString())
    .withExec(["echo", ">>>>>>>>>>>>>>>>> TESTING. STARTS. NOW! <<<<<<<<<<<<<<<<<"])
    .withExec(["go", "test", "./..."])
    
  const out = await tests.stdout()

}, { LogOutput: process.stdout })
