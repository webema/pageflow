import React from 'react';
import '@testing-library/jest-dom/extend-expect'

import {renderInEntry} from 'support';
import {useFakeMedia, fakeMediaRenderQueries} from 'support/fakeMedia';

import {Backdrop} from 'frontend/Backdrop';

import {usePortraitOrientation} from 'frontend/usePortraitOrientation';
jest.mock('frontend/usePortraitOrientation')

describe('Backdrop', () => {
  useFakeMedia();

  it('supports rendering image given by id', () => {
    const {getByRole} =
      renderInEntry(
        <Backdrop image={100} />,
        {
          seed: {
            fileUrlTemplates: {
              imageFiles: {
                large: ':basename.jpg'
              }
            },
            imageFiles: [
              {permaId: 100, basename: 'image'}
            ]
          }
        }
      );

    expect(getByRole('img')).toHaveAttribute('style', expect.stringContaining('image.jpg'));
  });

  it('supports rendering mobile image given by id in portrait orientation', () => {
    usePortraitOrientation.mockReturnValue(true);

    const {getByRole} =
      renderInEntry(
        <Backdrop image={100} imageMobile={200} />,
        {
          seed: {
            fileUrlTemplates: {
              imageFiles: {
                large: ':basename.jpg'
              }
            },
            imageFiles: [
              {permaId: 100, basename: 'landscape'},
              {permaId: 200, basename: 'portrait'},
            ]
          }
        }
      )

    expect(getByRole('img')).toHaveAttribute('style', expect.stringContaining('portrait.jpg'));
  });

  it('uses default image in landscape orientation even if mobile image is configured', () => {
    usePortraitOrientation.mockReturnValue(false);

    const {getByRole} =
      renderInEntry(
        <Backdrop image={100} imageMobile={200} />,
        {
          seed: {
            fileUrlTemplates: {
              imageFiles: {
                large: ':basename.jpg'
              }
            },
            imageFiles: [
              {permaId: 100, basename: 'landscape'},
              {permaId: 200, basename: 'portrait'},
            ]
          }
        }
      )

    expect(getByRole('img')).toHaveAttribute('style', expect.stringContaining('landscape.jpg'));
  });

  it('falls back to portrait image if default image is not defined', () => {
    usePortraitOrientation.mockReturnValue(false);

    const {getByRole} =
      renderInEntry(
        <Backdrop imageMobile={200} />,
        {
          seed: {
            fileUrlTemplates: {
              imageFiles: {
                large: ':basename.jpg'
              }
            },
            imageFiles: [
              {permaId: 200, basename: 'portrait'},
            ]
          }
        }
      )

    expect(getByRole('img')).toHaveAttribute('style', expect.stringContaining('portrait.jpg'));
  });

  it('supports rendering color as background', () => {
    usePortraitOrientation.mockReturnValue(false);

    const {container} =
      renderInEntry(
        <Backdrop color="#f00" />
      )

    expect(container.querySelector('div[style]'))
        .toHaveAttribute('style', expect.stringContaining('rgb(255, 0, 0)'));
  });

  it('supports rendering color via legacy image prop', () => {
    usePortraitOrientation.mockReturnValue(false);

    const {container} =
      renderInEntry(
        <Backdrop image="#f00" />
      )

    expect(container.querySelector('div[style]'))
        .toHaveAttribute('style', expect.stringContaining('rgb(255, 0, 0)'));
  });

  it('supports rendering video given by id', () => {
    const {getPlayerByFilePermaId} =
      renderInEntry(
        <Backdrop video={100}>
          {children => children}
        </Backdrop>,
        {
          queries: fakeMediaRenderQueries,
          seed: {
            videoFiles: [{permaId: 100}]
          }
        }
      );

    expect(getPlayerByFilePermaId(100)).toBeDefined();
  });
});
