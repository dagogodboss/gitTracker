import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RequestHandler } from 'express';

export function ValidatorMiddleware<T>(dtoClass: new () => T): RequestHandler {
  return async (req, res, next) => {
    const dto: any = plainToClass(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints ?? {}))
        .reduce((arr, val) => arr.concat(val), []);

      res.status(400).json({ errors: errorMessages });
    } else {
      req.body = dto;
      next();
    }
  };
}
