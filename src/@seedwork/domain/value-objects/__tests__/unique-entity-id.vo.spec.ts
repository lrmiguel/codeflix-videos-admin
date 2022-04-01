import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from 'uuid';

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {

  const validateSpy = spyValidateMethod();

  it("should throw error when uuid is invalid", () => {

    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed into constructor", () => {
    const uuid = "33907ed3-9d4a-4080-9b45-d4ae05046596";
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should validate a uuid passed into constructor", () => {
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });

});