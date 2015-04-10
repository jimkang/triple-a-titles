HOMEDIR = $(shell pwd)
GITDIR = /var/repos/triple-a-titles.git

test:
	node tests/basictests.js

run:
	node post-triple-a-title.js

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install
