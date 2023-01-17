import React from 'react';
import { injectIntl } from 'react-intl';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const TagsInputExample = ({ intl, onChange, tags }) => {
  const { messages } = intl;

  return (
    <TagsInput
      value={tags}
      onChange={onChange}
      inputProps={{ placeholder: messages['form-components.tags'] }}
    />
  );
};
export default injectIntl(TagsInputExample);
