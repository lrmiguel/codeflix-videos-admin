import { Category, CategoryProperties } from "./category";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
describe("Category Tests", () => {
  test("constructor of categories with all fields", () => {
    // Arrange
    let created_at = new Date;
    const props = {
      name: "Movie",
      created_at
    };

    // Act
    let category = new Category(props);

    // Assert
    expect(category.props).toStrictEqual(
      {
        name: "Movie",
        description: null,
        is_active: true,
        created_at
      }
    );
    expect(category.props.created_at).toBeInstanceOf(Date);
  });

  test("constructor of categories with only the mandatory field", () => {
    const category = new Category({
      name: "Movie",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
    });
  });

  test("id field creation", () => {
    type CategoryData = { props: CategoryProperties, id?: UniqueEntityId };

    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach(arrangeData => {
      let category = new Category(arrangeData.props, arrangeData.id);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });

  });

});