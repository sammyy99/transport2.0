export const webServiceOptions = [{value:'Y',option:'All Work'},{value:'N',option:'No Service'},{value:'U',option:'Upload'},{value:'R',option:'Bilty Update'}]
export const BHIAC = [{value:'B',option:'Branch'},{value:'H',option:'Head Office'},{value:'I',option:'Individual'},{value:'A',option:'A'},{value:'C',option:'C'}]
export const accountType = [{value:'TRANSPORT',option:'TRANSPORT'},{value:'PUBLISHER',option:'PUBLISHER'},{value:'PDEALER',option:'PDEALER'}]

export const help = [
    { id: 0, msg: 'Select Account Type' },
    { id: 1, msg: 'Select State' },
    { id: 2, msg: 'Select Station' },
    { id: 3, msg: 'Location for the Account' },
    { id: 4, msg: 'Enter Unique Account Name' },
    { id: 5, msg: 'Enter Mailing Account Name' },
    { id: 6, msg: 'Enter GST Number' },
    { id: 7, msg: 'Enter Address (Line 1)' },
    { id: 8, msg: 'Enter Address (Line 2)' },
    { id: 9, msg: 'Enter Address (Line 3)' },
    { id: 10, msg: 'B = Branch, H = Head Office, I = Individual' },
    { id: 11, msg: 'Y = All Work, N = No Service, U = Upload, B = Bilty Update' },
    { id: 12, msg: 'Enter data upload starting Date for Portal' },
    { id: 13, msg: 'Enter Web Service Starting Date' },
    { id: 14, msg: 'Enter Web Service Ending Date' },
    { id: 15, msg: 'Enter Work Licence Date' },
    { id: 16, msg: 'Enter Last Working Licence Date' },
    { id: 17, msg: 'Enter Y for allowing Web Backup, N for not Allowed' },
    { id: 18, msg: 'Enter Y for allowing Ewaybill, N for not Allowed' },
    { id: 19, msg: 'Enter Y for Auto GR no. Increment, N for no' },
    { id: 20, msg: 'B = Booking, D = Delivery, A = All' },
    { id: 21, msg: 'Multi Station Booking from Chalan' },
    { id: 22, msg: 'Enter Y to add from Station in GR, N for no' },
    { id: 23, msg: 'Enter Y to allow Multi User System, N for no' },
    { id: 24, msg: 'Enter Y to print Developer, N for no' },
    { id: 25, msg: 'Enter Y to Manual Chalan, N for no feeding' },
    { id: 26, msg: 'Enter Y to feed Multiple Item in GR' },
    { id: 27, msg: 'Enter Y to make Full Truck Load GR' },
    { id: 28, msg: 'Enter Y to apply Ewaybill API' },
    { id: 29, msg: 'Enter Contact Person Name' },
    { id: 30, msg: 'Enter Office Phone Number' },
    { id: 31, msg: 'Enter Residence Phone Number' },
    { id: 32, msg: 'Enter Mobile Number' },
    { id: 33, msg: 'Enter Fax Number' },
    { id: 34, msg: 'Enter email Address' },
    { id: 35, msg: 'Enter Domain' },
];

/*// Event listener for Enter key navigation between input fields
const handleEnterKeyDown = (event) => {
  if (!isSearching && event.key === 'Enter') {
    event.preventDefault();
    const formElements = Array.from(divRef.current.querySelectorAll('input, select'));
    const index = formElements.indexOf(document.activeElement);
    if (index > -1 && index < formElements.length - 1) {
      formElements[index + 1].focus();
    }
  }
};

useEffect(() => {
  if (isSearching) {
    searchRef.current?.focus();
  }

  // Event listener for search table navigation
  const handleTableNavigation = (event) => {
    if (event.key === 'ArrowUp') {
      setSelectedRowIndex((prevIndex) => {
        return prevIndex > 0 ? prevIndex - 1 : 0;
      });
    } else if (event.key === 'ArrowDown') {
      setSelectedRowIndex((prevIndex) => {
        return prevIndex < searchedRecords.length - 1 ? prevIndex + 1 : searchedRecords.length - 1;
      });
    } else if (event.key === 'Enter') {
      if (searchedRecords.length > 0 && selectedRowIndex >= 0) {
        const selectedRow = searchedRecords[selectedRowIndex];
        if (selectedRow) {
          handleRecordSelection(selectedRow);
          searchSwitchOff();
        }
      }
    } else if (event.key === 'Escape') {
      searchSwitchOff();
      setFullScreen(false);
    }
  };

  document.addEventListener('keydown', handleTableNavigation);
  document.addEventListener('keydown', handleEnterKeyDown);

  return () => {
    document.removeEventListener('keydown', handleTableNavigation);
    document.removeEventListener('keydown', handleEnterKeyDown);
  }
}, [isSearching, selectedRowIndex, searchedRecords, helpId, fullScreen]);
 */

