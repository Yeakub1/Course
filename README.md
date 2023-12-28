# Assignment -4

### Live Server Link: https://assigments-six.vercel.app/

- At first clone my GitHub repo. then install all the packages.
- To install all the packages. go to the terminal and command

```npm
  npm i
```

- After Installing all the packages. run npm run start:dev to start the server.

```npm
npm run start:dev
```

## 1. User Registration
-  Create a Course Endpoint: **POST /api/auth/register**
 
## 2. User Login
-  User Login Endpoint: **POST /api/auth/login**
  
## 3. Change Password
-  Change Password Endpoint: **POST /api/auth/change-password**
 
## 4. Create a Course (Only Admin can do this)  
-  Create a Course Endpoint: **POST /api/courses**

## 5. Get Paginated and Filtered Courses.
-  Get a Course Endpoint: **GET /api/courses**
- Query Parameters for API Requests Example: **GET ?page=2,?limit=10,title, price, startDate, endDate, language, durationInWeeks,?sortBy=startDate,?sortOrder=desc,?minPrice=20.00&maxPrice=50.00,?tags=Programming,?startDate=2023-01-01&endDate=2023-12-31,?language=English,?provider=Tech Academy,?durationInWeeks=8,?level=Intermediate**

## 6. Create a Category (Only Admin can do this)
- Create a Category: **POST /api/categories**

## 7. Get All Categories
- Get All Categories: **GET /api/categories**

## 8. Create a Review (Only the user can do this)
- Create a Review Endpoint: **POST /api/reviews**

## 9. Update a Course (Only Admin can do this)
- Update a Course (Partial Update with Dynamic Update) Endpoint: **PUT /api/courses/:courseId**

## 10. Get Course by ID with Reviews
- Get Course by ID with Reviews Endpoint: **GET /api/courses/:courseId/reviews**

## 11. Get the Best Course Based on Average Review (Rating)
- Get the Best Course Based on Average Review (Rating) Endpoint: **GET /api/course/best**
