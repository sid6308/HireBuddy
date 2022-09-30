import Dropdown from "components/dropdown/dropdown";

import Input from "components/input/input";

export const debounce = (fn, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(
      () => fn.apply(this, arguments),

      delay
    );
  };
};

export const getFormFields = (element, inputHandler) => {
  let field = null;

  switch (element?.type) {
    case "dropdown":
      field = (
        <Dropdown
          placeholder={element.placeholder}
          label={element.label}
          retriveDropdownValue={(e) => inputHandler(e, element.name)}
          options={element.options}
          error={element.error}
          isRequired={element.isRequired}
          isMultiple={element.isMultiple}
          name={element.label}
        />
      );
      break;
    default:
      field = (
        <Input
          type={element.type}
          placeholder={element.placeholder}
          label={element.label}
          value={element.value}
          handleChange={(e) => inputHandler(e, element.name)}
          isRequired={element.isRequired}
          error={element.error}
          isReadOnly={element.isReadOnly}
          maxLength={element.maxLength}
          minLength={element.minLength}
          accept_file_type={element.acceptFileType}
          max_file_size={element.maxSize}
          aria-label={element.name}
        />
      );
  }

  return field;
};

export const displayErrorMsg = (element) => {
  let errorMsg = "";
  if (element?.value?.length && element.type !== "file") {
    return;
  }

  switch (element.type) {
    case "dropdown":
      errorMsg = `Choose ${element.label} from Dropdown !`;
      break;
    case "file":
      errorMsg = validateFiles(element);
      break;
    case "search":
      errorMsg = `Please Type ${element.label} to Search !`;
      break;
    case "date":
      errorMsg = `Please Choose ${element.label} !`;
      break;
    default:
      errorMsg = `Please Enter the ${element.label} !`;
  }
  return errorMsg;
};

export const deepCloneObj = (obj) => {
  let newObj = {};

  for (let key in obj) {
    if (typeof obj[key] == "object" && !Array.isArray(obj[key])) {
      newObj[key] = deepCloneObj(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const validateFiles = (element) => {
  let error = "";
  let files = element?.value?.target?.files;

  if (!files?.length) return (error = `Upload ${element.label} from Device !`);

  for (let key of files) {
    let fileSize = key?.size / (1024 * 1024);
    let fileExtension = key?.name.split(".")[1];
    if ( element.maxSize && fileSize > element.maxSize) {
      error = "File size is too large !";
    }
    if (element?.acceptFileType && !element?.acceptFileType?.includes(fileExtension)) {
      error = "File is not Supported !";
    }

    return error;
  }
};
