## 2. Product List Page

| Test Case ID | Test Description                  | Steps                         | Expected Result                            | Status | Result | Notes |
| ------------ | --------------------------------- | ----------------------------- | ------------------------------------------ | ------ | ------ | ----- |
| PLP-01       | Verify all products are displayed | Navigate to Product List page | Product cards load with image, name, price |    Complete    |    Pass    |    Products are displayed as expected   |
| PLP-02       | Verify pagination works           | Scroll or click next page     | New set of products load correctly         |    Complete    |    Pass    |    Pagination works as expected   |
| PLP-03       | Verify sorting by price           | Select “Price: Low to High”   | Products reorder accordingly               |    Complete    |    Pass    |    Price sorting works functionally. However, the products noticably flicker when sorting   |
| PLP-04       | Verify filtering by category      | Choose a category filter      | Only matching products are shown           |    Complete    |     Pass   |    Filters work as expected   |
| PLP-05       | Verify search functionality       | Enter keyword in search bar   | Matching products displayed                |    Complete    |    Pass    |    Search functionality works as expected with similar issue of BUG-005   |
| PLP-06       | Verify product quick view         | Hover/click quick view button | Product preview modal opens                |     Complete   |    Pass    |    Product View works as expected| 

**Last Updated:** November 12, 2025



