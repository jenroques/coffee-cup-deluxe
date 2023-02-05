# Coffee Cup Deluxe 

## Neighborhood Coffeeshop Hub

Keep track of all your favorite shops, post reviews and see other's reviews as well! 

### Initial Setup: 
Open your termial, CD into the project directory and enter the following commands: 

bundle install

npm install --prefix client

### Initalize Database:

rails db:drop

rails db:create

rails db:migrate

### Seeds

rails db:seed

### Run Application:

rails s

npm start --prefix client

### Functionality: 

Create an account & login for full access. 

<img width="307" alt="Screenshot 2023-01-29 at 10 16 58 AM" src="https://user-images.githubusercontent.com/90016446/215339646-4eb2f990-a593-48ac-a8b8-68c08fde2d33.png">

Once logged in, the user has access to all the shops that are registered with the application: 

<img width="340" alt="Screenshot 2023-01-29 at 10 19 47 AM" src="https://user-images.githubusercontent.com/90016446/215339751-5bdb5378-bab6-4b55-9a71-2c5c782e172b.png">

If a new shop has opened in the neighborhood, they can be added to the site via the main Shops page: 

<img width="313" alt="Screenshot 2023-01-29 at 10 21 32 AM" src="https://user-images.githubusercontent.com/90016446/215339844-96cfabed-8554-4c79-a854-04e1319d035d.png">

Click on the "Shop Details" button to see reviews of that shop: 

<img width="394" alt="Screenshot 2023-01-29 at 10 20 46 AM" src="https://user-images.githubusercontent.com/90016446/215339931-9bed3b05-84f0-4ab0-8a73-ee1912f1f9e2.png">

This is also where the user can leave reviews for the shop by clicking on "Add Review": 

<img width="320" alt="Screenshot 2023-01-29 at 10 24 45 AM" src="https://user-images.githubusercontent.com/90016446/215340046-ed2e74b2-5028-4444-a9ea-dff5869d0da7.png">

Clicking on the "Profile" tab in Navigation, will take the user to their Profile page. 
Here you will find the user's login name, and the Review Manager, which show reviews left for each shop they have visted and reviewed:

<img width="355" alt="Screenshot 2023-01-29 at 10 26 49 AM" src="https://user-images.githubusercontent.com/90016446/215340141-6d631ab9-a1ce-4dac-8a0c-94bb0bb5dcd0.png">

Clicking on "Manage Review" will open a modal for the user to update or delete their review: 

<img width="367" alt="Screenshot 2023-01-29 at 10 28 31 AM" src="https://user-images.githubusercontent.com/90016446/215340196-4eaedf12-4b24-4471-9e10-b3e07df1c79f.png">

Once the user is done with the application, they are able to Logout completely, and are redirected to the "Login" screen. 

### Created with: 
MUI 

Project Template: React/Rails API 

Ruby on Rails

React
