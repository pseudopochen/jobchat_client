# jobchat a chatting app to connect job applicants with hiring managers

This is the front-end of the app. The back-end is in a separate repository named "jobchat_server", which is built on Node, Express, Mongoose and Socket.io.

The front-end of this app is built using React-17, Ant-Design-Mobile (antd-mobile), Redux, Axios and Socket.io. 

1. The user interface is designed for mobile devices and implemented using "antd-mobile". 

2. New users will go through a registration page, which collects a user name, password and does validation, and then a secondary information collection page, which allows the new user to pick an "avatar" image, describe their skills (for job applicants) or background information (e.g., salary) related to the position (for managers).

3. For returning users, the client-side code handles auto-login using a cookie. For job applicants, the main page after login is a list of all hiring managers (with brief info about unfilled positions). For hiring managers, the main page after login is a list of job applicants.

4. Each applicant/manager on the main page can be tapped to start the messaging page, which allows entering emojis. If both sides of the chat are online, the messages are displayed right away. If one side of the chat is off-line, the messages are stored in the database with the "unread" flag. The total number of unread messages are queried and displayed to the user the next time the user logs in.

5. Accesses to the database are handled by dispatching async actions and the results of the database accesses are stored in two redux states: "user" and "chat". 

6. The "user" state stores information (e.g., user id assigned by MongoDB, path to the avatar image) for the current user.

7. The "chat" state stores information about all chat messages relavant to the current user, who is either the sender or the receiver of the message. 

8. A few screenshots of the app's user interface are stored inside "public/screenshots/"

