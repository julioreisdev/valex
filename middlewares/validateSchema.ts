import { AnySchema } from "joi";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema: AnySchema) {
    const validate = (req: Request, res: Response, next: NextFunction) => {
      const body = req.body ? req.body : req.params;
      const { error } = schema.validate(body, { abortEarly: false });
      if (error) {
        const erros = error.details.map((d) => d.message);
        return res.status(422).send(erros);
      }
      res.locals.body = body;
      next();
    };
    return validate;
  }