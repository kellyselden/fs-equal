# fs-equal

[![Build Status](https://travis-ci.org/kellyselden/fs-equal.svg?branch=master)](https://travis-ci.org/kellyselden/fs-equal)
[![Build status](https://ci.appveyor.com/api/projects/status/p1uehl4qou9m47wl/branch/master?svg=true)](https://ci.appveyor.com/project/kellyselden/fs-equal/branch/master)
[![Code Climate](https://codeclimate.com/github/kellyselden/fs-equal/badges/gpa.svg)](https://codeclimate.com/github/kellyselden/fs-equal)
[![Coverage Status](https://coveralls.io/repos/kellyselden/fs-equal/badge.svg?branch=master&service=github)](https://coveralls.io/github/kellyselden/fs-equal?branch=master)

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/fs-equal.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/fs-equal.svg)](https://badge.fury.io/js/fs-equal)
[![dependencies Status](https://david-dm.org/kellyselden/fs-equal/status.svg)](https://david-dm.org/kellyselden/fs-equal)
[![devDependencies Status](https://david-dm.org/kellyselden/fs-equal/dev-status.svg)](https://david-dm.org/kellyselden/fs-equal?type=dev)

Check if files and folders are identical

### Installation

```sh
npm install fs-equal --save
```

### Usage

```js
import { areFilesEqual, areDirsEqual } from 'fs-equal';

areFilesEqual('file1', 'file2').then(areEqual => {
  console.log(areEqual);
});

areDirsEqual('dir1', 'dir2', {
  // optional
  filter(fullPath) {
    return fullPath !== 'some/path';
  }
}).then(areEqual => {
  console.log(areEqual);
});
```
