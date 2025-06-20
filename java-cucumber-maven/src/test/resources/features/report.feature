Feature: Report Generation Suite

  @TestId:T21 @Title:Generate_monthly_sales_report
  Scenario: Generate monthly sales report
    Given sales data exists for the month
    When monthly report is requested
    Then report should be generated successfully

  @TestId:T22 @Title:Export_report_to_pdf_format
  Scenario: Export report to PDF format
    Given report data is available
    When PDF export is requested
    Then PDF file should be created successfully

  @TestId:T23 @Title:Generate_report_with_no_data
  Scenario: Generate report with no data
    Given no data exists for report period
    When report generation is attempted
    Then appropriate empty report message should be shown

  @TestId:T24 @Title:Schedule_automated_report_generation
  Scenario: Schedule automated report generation
    Given automated report is configured
    When scheduled time arrives
    Then report should be generated automatically

  @TestId:T25 @Title:Custom_report_filter_functionality
  @ignore
  Scenario: Custom report filter functionality
    Given report supports custom filters
    When filters are applied
    Then report should show filtered data only