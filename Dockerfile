FROM ubuntu:16.04

# Install Node.js 10
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y build-essential
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs

#install Openshift-client
RUN cd /tmp \
  && apt-get update \
  && apt-get install -y wget \
  && wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz \
  && tar -xvzf openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz \
  && mv openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit/oc /usr/local/bin/ \
  && rm -rf openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz

# Copy the current directory contents into the container
ADD . /app

# Set the working directory to /app
WORKDIR /app/src

# Install any needed packages specified in requirements.txt
RUN npm install

# Make port 4000 available outside this container
EXPOSE 4000

RUN oc login https://api.starter-us-west-2.openshift.com --token=OtyWuoPZiWSmYhIMJr1TxSe4tu_yVPDxezHXdHnOy1k

# Run `npm start` when the container launches
CMD ["npm", "start"]