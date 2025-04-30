export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: string | null;
  public message: string | null;
  private _value: T | null;

  private constructor(
    isSuccess: boolean,
    error: string | null,
    value: T | null,
    message: string | null,
  ) {
    if (isSuccess && error) {
      throw new Error(
        `Operação inválida: O resultado com sucesso não pode conter mensagem de erro.`,
      );
    }
    if (!isSuccess && !error) {
      throw new Error(`Operação inválida: É necessário uma mensagem de erro.`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.message = message;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess || !this._value) {
      throw new Error(
        `Não é possível retornar esse valor para uma operação com erro.`,
      );
    }

    return this._value;
  }

  public static ok<U>(value: U | null, message: string | null): Result<U> {
    return new Result<U>(true, null, value, message);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error, null, null);
  }
}
