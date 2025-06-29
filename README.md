This application now has docker and all the dependencies are added to it
All you need to do is install the docker into your machine and run it
The application will start running inside it

Step1 : Install docker
apt install docker.io

Step2 : build docker container
docker build -t nessefy-frontend .

Step3 : run docker image
docker run -d -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt nessefy-frontend


you are set now - open http://localhost:80