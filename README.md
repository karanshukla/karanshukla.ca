## karanshukla.github.io

### Setup
'''
npm install -g harp
'''

### Development
'''
harp server src
'''

Go to localhost:9000

### Deployment
'''
harp compile src docs
git add .
git commit -m "Recompiled."
git push origin master
'''