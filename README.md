# How to Run the project

npm start

# A brief summary of the project

This is an expense tracker that consists of 3 tables that dynamically update certain fields based on user actions. The user table displays a list of all the users as well as their running total expense. The expense table displays the user, category, description, and cost of the expense. The summary table displays the category as well as the running total expense. Users may create/edit/delete entries in the user and expense table to interact with the tables. 

# design/implementation tradeoffs:

react hook form vs formic

When researching between the two, I chose react hook form because it has fewer dependencies, smaller bundle size, fewer re-renders, and quicker mounting time. 

In the user data structure, I store the first and last name seperately. When I need to access the full name, I create it and store it in a variable rather than storing a full name field in the user data structure.  
