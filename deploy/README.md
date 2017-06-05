The first time you provision the machine and deploy the site, use
ansible-galaxy install -r requeriments.yml
ansible-playbook -i inventory -u root site.yml --ask-vault-pass

After that, since we have locked root ssh, you will have to use your private key
ansible-playbook -i inventory -bK site.yml --ask-vault-pass
