The first time you deploy the site, use
ansible-playbook -i inventory -u root site.yml --ask-vault-pass

After that, since we have locked root ssh, you will have to use your private key
ansible-playbook -i inventory -bK site.yml --ask-vault-pass
