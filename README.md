# step 1 ; Authentication build using otp system

1. create model folder
2. create user Schema
3. fields firstName,lastName,email,password,opt,otpExires,isVarified
4. go to on gmail account two step verification on and create project and get password
5. .env file create save email and password
6. nodemailer npm library install
7. sendEmail() function create
   this function pass email an password
   const trsnaporter = nodemailer.createTransport(
   services:GMAIL
   auth{
   email:
   password:
   }
   )
   await transport.sendMail(
   from:
   to:
   subject:
   text:
   )
8. register routes create
   1. generate 6 digit otp react element
   2. take firstName,lastName,email,password from user
   3. create opt, optExpires and hashedPassword create using bcrypt.hash method
   4. 2 condition chaecked
      1. user is exist in database but not verified
         if(existingUser){
         if(existingUser.isVerified){
         // error throw
         }else{
         // change existing user data
         // send otp using sendEmail() function
         }
         }
      2. user not exist create new user
      3. sendEmail() send opt
   5. success responce message.
9. verify otp routes created
   1. take eamil and otp from user
   2. check user exist or not
   3. check useris verified or not
   4. check opt is matched or not
   5. check otp is expired or not
   6. all conditions are ture
      1. user.isverified = true
      2. user.otp = null
      3. user.otpExpires = null
      4. save user in database
   7. success responce message
10. create login routes
11. take email and password from req body
12. check email is exist or not
13. check check password is match with db password using bcrypt.compare
14. create jwt token using jsonwebtoken library
15. send token inside cookie
16. success login message

17. foreget password routes
18. take email from req.body
19. genrate opt
20. generate otpexpires
21. save user in databse
22. sendEmail() through send otp and success responce

23. verify password routes create
24. take otp from req.body
25. chaeck otp is expired or not
26. hashed password generate using bcrypt library
27. otp and otpExpire make to undefine
28. user save into datbase
29. success responce
