all: clean functionTemplate dockerTemplate

functionTemplate:
	tar cf fn-template.tar.gz --exclude Dockerfile --exclude package-lock.json \
		--exclude fn-template.tar.gz  --exclude yarn.lock --exclude Makefile --exclude *.tar.gz \
		--exclude node_modules --exclude yarn-error.log --exclude docker-template.tar.gz * .babelrc

dockerTemplate:
	tar cf docker-template.tar.gz Dockerfile

clean:
	rm -f fn-template.tar.gz docker-tempalte.tar.gz
