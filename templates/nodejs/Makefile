buildTemplate: clean
	tar cf fn-template.tar.gz --exclude Dockerfile --exclude package-lock.json --exclude fn-template.tar.gz  --exclude yarn* --exclude Makefile *

dockerTemplate: clean
	tar cf docker-template.tar.gz --exclude **/*.js --exclude package-lock.json --exclude fn-template.tar.gz  --exclude yarn* --exclude Makefile *

clean:
	rm -f fn-template.tar.gz docker-tempalte.tar.gz
