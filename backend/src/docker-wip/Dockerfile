
# Mandatory, every dockerfile must be based from another image
FROM node:16

# This sets the current working dir, all further action will made relative to this path
WORKDIR /app/medusa

# We copy the package.json and intall before deps first for perforance reason.
# This is longest step so dependancies are cache for subsequent steps
COPY package.json .
RUN yarn

# We can now copy the rest of the source code across, we dont need re-run npm install as dependancies are installed already
COPY . .

# We know upfront that the app runs on port 3000 , may need to paramatise this later
EXPOSE 9000


# run the bash commands that will start the app
CMD ["yarn", "start"]