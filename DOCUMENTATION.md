# Book Exchange Platform - Project Documentation

### Approach

1. UI Design
- Objective: The goal was to create a clean, user-friendly interface that allows users to easily navigate through the platform.
- Tools Used: I chose Tailwind CSS for its flexibility and utility-first approach, enabling rapid styling without writing custom CSS.
Pages Implemented:
- User Registration and Login: A straightforward form design for account management.
- Book Listing: I used table layout was used to display books, with modals and forms for adding and editing details.
- Book Discovery: Implemented filtering options for users to easily search for books based on genre, author,title etc.
- Matchmaking Page: A visually engaging layout to highlight potential matches, making the user experience intuitive.

2. Functionality Implementation
- User Authentication: Implemented secure authentication using JWT (JSON Web Tokens). This allows users to register, log in, and maintain session persistence.
- Book Management: Used RESTful APIs to manage book listings (create, read, update, delete). Books are linked to user profiles, ensuring each user's listings are managed independently.
- Book Matching Algorithm: Developed a filter  to get only that books which user is interested in.
- Exchange Requests: Created an interactive feature allowing users to send and accept exchange requests. 
3. Database Integration
Database Design: I opted for a NoSQL database due to its flexibility in handling unstructured data and dynamic schemas. The schema was designed to effectively link users, books, and exchange requests.

Mongoose Usage: Mongoose was used to interact with the database, simplifying queries and ensuring data integrity with schema validation.

4. Deployment
- Platform: Deployed the application on Vercel, chosen for its seamless integration with GitHub and ease of use for full-stack deployments.
- Environment Management: Managed sensitive information using environment variables. Vercel’s environment configuration feature was used for production-ready deployment.

### Challenges Faced
1. Responsive Design
- Challenge: Ensuring that the application was fully responsive across all devices was a key challenge, especially when managing complex layouts like the matchmaking page.
- Solution: Used Tailwind CSS’s responsive utilities, allowing for conditional styling based on screen size. Regular testing on multiple devices ensured the UI was consistent.
2. Book Matching Logic
- Challenge: Creating a matching algorithm that accurately pairs users based on their book preferences without overcomplicating the logic.
- Solution: Simplified the matching logic to focus on key criteria (genre, author) while leaving room for future enhancements. This approach balanced performance with accuracy.
3. Database Relations
- Challenge: Defining and maintaining clear relationships between users, books, and exchange requests was crucial, especially when handling complex queries.
- Solution: MongoDB schema modeling was employed to clearly define these relationships. Extensive testing was conducted to ensure that the database queries returned accurate and efficient results.

4. Deployment Issues
- Challenge: Encountered issues with environment variables not being recognized during deployment.
- Solution: The issue was resolved by correctly setting up environment variables in Vercel’s dashboard and ensuring they were properly referenced in the application.