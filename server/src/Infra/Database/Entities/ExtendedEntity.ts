import { BaseEntity, ObjectLiteral } from "typeorm"
import Pagination from "../../../Presentation/GraphQL/ObjectTypes/Pagination"

interface IPaginationInput {
  skip: number
  take: number
  count: number
}

class ExtendedEntity extends BaseEntity {
  public static async paginate(
    skip: number,
    take: number,
    query?: ObjectLiteral
  ) {
    const [entities, count] = await this.findAndCount({
      ...query,
      skip,
      take,
    })

    return [
      new Pagination({ skip, take, count, has_next: skip + take < count }),
      ...entities,
    ]
  }

  public static toPaginated(
    entities: ExtendedEntity[],
    { skip, take, count }: IPaginationInput
  ) {
    return [
      new Pagination({ skip, take, count, has_next: skip + take < count }),
      ...entities,
    ]
  }
}

export default ExtendedEntity
