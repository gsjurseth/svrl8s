tag = 1

build: 
	docker build -t nodejs-controller .

tag: build
	docker tag nodejs-controller eu.gcr.io/geirs-purdy-project/nodejs-controller:$(tag)

push: tag
	docker push eu.gcr.io/geirs-purdy-project/nodejs-controller:$(tag)


#docker tag apigee-opdk eu.gcr.io/gsj-k8s-training/apigee-opdk:6
#docker push eu.gcr.io/gsj-k8s-training/apigee-opdk:6
