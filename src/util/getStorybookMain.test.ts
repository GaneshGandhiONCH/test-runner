import { getStorybookMain, resetStorybookMainCache } from './getStorybookMain';
import * as coreCommon from '@storybook/core-common';

jest.mock('@storybook/core-common');

describe('getStorybookMain', () => {
  beforeEach(() => {
    resetStorybookMainCache();
  });

  it('should throw an error if no configuration is found', () => {
    expect(() => getStorybookMain('.storybook')).toThrowErrorMatchingSnapshot();
  });

  describe('no stories', () => {
    it('should throw an error if no stories are defined', () => {
      jest.spyOn(coreCommon, 'serverRequire').mockImplementation(() => ({}));

      expect(() => getStorybookMain('.storybook')).toThrowErrorMatchingSnapshot();
    });

    it('should throw an error if stories list is empty', () => {
      jest.spyOn(coreCommon, 'serverRequire').mockImplementation(() => ({ stories: [] }));

      expect(() => getStorybookMain('.storybook')).toThrowErrorMatchingSnapshot();
    });
  });

  it('should return mainjs', () => {
    const mockedMain = {
      stories: [
        {
          directory: '../stories/basic',
          titlePrefix: 'Example',
        },
      ],
    };

    jest.spyOn(coreCommon, 'serverRequire').mockImplementation(() => mockedMain);

    const res = getStorybookMain('.storybook');
    expect(res).toMatchObject(mockedMain);
  });
});
