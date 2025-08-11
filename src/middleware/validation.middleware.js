import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { responseTemplate } from '../enums/responseTemplate.enum';


export function validationMiddleware(dtoClass, skipMissingProperties = false, whitelist = false) {

  return (req, res, next) => {

    // Merge req.body and req.files into a single object
    const merged = Object.assign({}, req.body, req.files);

    const dto = plainToClass(dtoClass, merged);

    validate(dto, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false
    }).then(errors => {
      if (errors.length > 0) {
        const validationErrors = errors.map(error => Object.values(error.constraints));
        return res.status(400).json(responseTemplate('Error', undefined, validationErrors));
      } else {
        next();
      }
    }).catch(error => {
      next();
    });
  }
}
