import Role from "../Entities/Role"

const run = async () => {
  await Role.delete({})

  await Role.create({
    title: "Administrator",
    description: "All access role",
  }).save()
}

export default run
