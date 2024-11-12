import { NextFunction, Request, Response } from 'express';
import { LayoutModel } from '../model/layout.model';
import { v2 as cloudinary } from 'cloudinary';
import CatchAsyncError from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';

// Controller to create a new layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      // return if there exist any type
      const isTypeExists = await LayoutModel.findOne({ type });
      if (isTypeExists) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }
      // Validate the `type` field
      if (!type) {
        return res.status(400).json({ error: 'Layout type is required' });
      }

      let layoutData: any = {}; // Object to hold the layout data

      switch (type) {
        // Handle "Banner" type
        case 'Banner': {
          const { image, title, subTitle } = req.body;

          // Validate required fields for Banner
          if (!image || !title || !subTitle) {
            return res.status(400).json({
              error:
                'Image, title, and subTitle are required for type "Banner"',
            });
          }

          // Upload image to Cloudinary
          // const myCloud = await cloudinary.uploader.upload(image, {
          //   folder: "layout"
          // });

          layoutData.banner = {
            // image: {
            //   public_id: myCloud.public_id,
            //   url: myCloud.secure_url
            // },

            title,
            subTitle,
          };
          layoutData.type = type;
          break;
        }

        // Handle "FAQ" type
        case 'FAQ': {
          const { faq } = req.body;

          // Validate FAQ items
          if (!faq || !Array.isArray(faq) || faq.length === 0) {
            return res
              .status(400)
              .json({ error: 'FAQ items are required for type "FAQ"' });
          }

          layoutData.faq = faq;
          layoutData.type = type;
          break;
        }

        // Handle "Categories" type
        case 'Categories': {
          const { categories } = req.body;

          // Validate Categories
          if (
            !categories ||
            !Array.isArray(categories) ||
            categories.length === 0
          ) {
            return res
              .status(400)
              .json({ error: 'Categories are required for type "Categories"' });
          }

          layoutData.categories = categories;
          layoutData.type = type;
          break;
        }

        default:
          return res
            .status(400)
            .json({ error: `Invalid layout type: ${type}` });
      }

      // Save the layout data to the database
      await LayoutModel.create(layoutData);

      res.status(201).json({
        success: true,
        message: 'Layout created successfully',
        layout: layoutData,
      });
    } catch (error: any) {
      console.log('this is error', error);
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// ------------------- UPDATE LAYOUT --------------------

// Update layout controller
import { NextFunction, Request, Response } from 'express';
import { LayoutModel } from '../model/layout.model';
import { v2 as cloudinary } from 'cloudinary';
import CatchAsyncError from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';

// Update layout controller
export const updateLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      // Validate request data
      if (!type) {
        return next(new ErrorHandler('Layout type is required', 400));
      }

      switch (type) {
        case 'Banner': {
          const bannerData = await LayoutModel.findOne({ type: 'Banner' });
          const { image, title, subTitle } = req.body;

          if (!bannerData) {
            return next(new ErrorHandler('Banner not found', 404));
          }

          // Update banner image if provided
          if (image) {
            if (bannerData?.image?.public_id) {
              await cloudinary.uploader.destroy(bannerData.image.public_id);
            }

            const myCloud = await cloudinary.uploader.upload(image, {
              folder: 'layout',
            });

            bannerData.image = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          }

          // Update title and subTitle
          bannerData.title = title || bannerData.title;
          bannerData.subTitle = subTitle || bannerData.subTitle;

          await bannerData.save();

          return res.status(200).json({
            success: true,
            message: 'Banner updated successfully',
            banner: bannerData,
          });
        }

        case 'Categories': {
          const { categories } = req.body;

          // Validate categories
          if (!Array.isArray(categories) || categories.length === 0) {
            return next(new ErrorHandler('Categories are required for type "Categories"', 400));
          }

          const categoriesData = await LayoutModel.findOne({ type: 'Categories' });
          if (!categoriesData) {
            return next(new ErrorHandler('Categories layout not found', 404));
          }

          // Map and validate categories
          const categoriesItem = categories.map(item => {
            if (!item.title) {
              throw new Error('Each category must have a title');
            }
            return { title: item.title };
          });

          // Update the categories in the database
          categoriesData.categories = categoriesItem;
          await categoriesData.save();

          return res.status(200).json({
            success: true,
            message: 'Categories updated successfully',
            categories: categoriesData.categories,
          });
        }

        case 'FAQ': {
          const { faq } = req.body;

          // Validate FAQ items
          if (!Array.isArray(faq) || faq.length === 0) {
            return next(new ErrorHandler('FAQ items are required for type "FAQ"', 400));
          }

          const faqData = await LayoutModel.findOne({ type: 'FAQ' });
          if (!faqData) {
            return next(new ErrorHandler('FAQ not found', 404));
          }

          // Validate and structure FAQ items
          const updatedFaqItems = faq.map(item => {
            if (!item.question || !item.answer) {
              throw new Error('Each FAQ item must have a question and an answer');
            }
            return {
              question: item.question,
              answer: item.answer,
            };
          });

          // Update the FAQ in the database
          faqData.faq = updatedFaqItems;
          await faqData.save();

          return res.status(200).json({
            success: true,
            message: 'FAQ updated successfully',
            faq: faqData.faq,
          });
        }

        default:
          return next(new ErrorHandler(`Invalid layout type: ${type}`, 400));
      }
    } catch (error: any) {
      console.error('Error updating layout:', error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
