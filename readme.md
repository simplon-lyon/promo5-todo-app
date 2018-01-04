# Docker nginx boilerplate
###### A simple static website boilerplate based on docker and nginx

## Installation

To run the app, you need to have docker, docker-compose and dnsmasq installed.

### Docker engine

1. Remove docker older version
`sudo apt-get remove docker docker-engine docker.io`
1. As always, apt update before anything ...
`sudo apt-get update -y`
1. allow Docker to use the aufs storage drivers.
`sudo apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual`
1. Install packages to allow apt to use a repository over HTTPS
`sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common`
1. Add GPG key
`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
1. Add repository
`sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`
1. update apt list
`sudo apt-get update -y`
1. install docker latest version
`sudo apt-get install -y docker-ce`

source : https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#uninstall-old-versions

### Docker compose

1. download docker compose in /usr/local/bin/docker-compose
```sh
  sudo curl -L https://github.com/docker/compose/releases/download/1.17.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```
1. make docker-compose executable
`sudo chmod +x /usr/local/bin/docker-compose`
1. Installing command completion
`sudo curl -L https://raw.githubusercontent.com/docker/compose/1.17.0/contrib/completion/bash/docker-compose -o /etc/bash_completion.d/docker-compose`
1. Optional, add current user to docker group
`sudo usermod -a -G docker $USER`

source : https://docs.docker.com/compose/install/

### dnsmasq

In order to redirect `.dev` tld to localhost, you need dnsmasq. To install it, do the following on ubuntu :

1. edit `/etc/NetworkManager/NetworkManager.conf` and replace `dns=dnsmasq` by `#dns=dnsmasq`
1. run `sudo apt-get install dnsmasq`
1. edit `/etc/dnsmasq.conf` and add those lines to the file :
```sh
  listen-address=127.0.0.1
  bind-interfaces
  address=/dev/127.0.0.1
```
4. run `sudo netstat -plant | grep :53` and look for `NUMBER/dnsmasq`
1. run `sudo kill -9 NUMBER` replace `NUMBER` by the number(s) you have seen in previous step.
1. run `sudo systemctl restart dnsmasq.service`, this will restart the dnsmasq service.
1. edit `/etc/dhcp/dhclient.conf` and uncomment (remove the `#`) on this line : `prepend domain-name-servers 127.0.0.1;`
1. run `sudo systemctl restart NetworkManager.service` to restart the network manager, you will temporarily lost your network connection.

source : https://www.leaseweb.com/labs/2013/08/wildcard-dns-ubuntu-hosts-file-using-dnsmasq/
