HOMEDIR = $(shell pwd)
GITDIR = /var/repos/yet-another-module.git
PM2 = $(HOMEDIR)/node_modules/pm2/bin/pm2

test:
	node tests/basictests.js

start: start-yet-another-module
	$(PM2) start yet-another-module.js --name yet-another-module

stop:
	$(PM2) stop yet-another-module || echo "Didn't need to stop process."

list:
	$(PM2) list

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install stop start
