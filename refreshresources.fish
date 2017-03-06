cd generators/app/templates/
rm dummyfile.txt
mv .babelrc _babelrc;
mv .gitignore _gitignore;
mv .gitlab-ci.yml _gitlab-ci.yml;
mv tslint.json _tslint.json;
mv yarn.lock _yarn.lock;
mv package.json _package.json;