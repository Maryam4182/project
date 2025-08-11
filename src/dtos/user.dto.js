import {IsString, IsEmail, IsNotEmpty, IsBoolean, IsIn, IsOptional} from 'class-validator';
import 'reflect-metadata';


export  class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullName;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email;

    @IsNotEmpty()
    password;
    
    @IsString()
    phone;

    @IsString()
    isActive;

    @IsString()
    @IsNotEmpty()
    @IsIn(['seller', 'user', 'admin'])
    userType;


    @IsBoolean()
    isBlocked;

    @IsString()
    country;

    @IsBoolean()
    isSubscriber;
  }

export  class LogInUserDto {
    @IsString()
    @IsNotEmpty()
    email;

    @IsString()
    @IsNotEmpty()
    password;

  }

  export  class GetSingleUserByEmailDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email;

  }

  export  class forgetpassword {
    @IsString()
    @IsNotEmpty()
    password;  
  }


  export class changepassword{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email;
    
    @IsString()
    @IsNotEmpty()
    password;  
  }


  export class UserIdDto{
    @IsString()
    @IsNotEmpty()
    id;

    @IsBoolean()
    @IsNotEmpty()
    isBanned;
}


export class UserSearchDTO {
    @IsString()
    @IsNotEmpty()
    keyword;
}

export class affiliateCodeDto{
  @IsString()
  @IsNotEmpty()
  name;
  
  @IsString()
  @IsOptional()
  affiliate_code;
}