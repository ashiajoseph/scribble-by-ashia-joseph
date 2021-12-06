import React, { useRef, useEffect } from "react";

import {
  Button,
  Input,
  Textarea,
  Dropdown,
  Select,
} from "@bigbinary/neetoui/v2";

const ArticleForm = ({ categoryList, formData, setFormData }) => {
  const articleTitleRef = useRef();

  useEffect(() => {
    articleTitleRef.current.focus();
  }, []);

  const handleChangeOfInput = e => {
    const { name, value } = e.target;
    setFormData(prevData => {
      return { ...prevData, [name]: value };
    });
  };

  const handleChangeOfSelect = e => {
    const value = e ? e.value : e;
    setFormData(prevData => {
      return { ...prevData, ["category_id"]: value };
    });
  };

  const handleChangeStatus = status => {
    setFormData(prevData => {
      return { ...prevData, ["status"]: status };
    });
  };

  return (
    <form>
      <div className="flex flex-row justify-between">
        <div className="w-62 mb-5">
          <Input
            label="Article Title"
            ref={articleTitleRef}
            name="title"
            value={formData["title"]}
            onChange={handleChangeOfInput}
          />
        </div>
        <div className="w-35">
          <Select
            size="small"
            isClearable
            isSearchable
            label="Category"
            name="category_id"
            options={categoryList.map(category => {
              return {
                label: category.name,
                value: category.id,
                name: "category_id",
              };
            })}
            placeholder="Select a Category"
            onChange={handleChangeOfSelect}
          />
        </div>
      </div>
      <Textarea
        label="Articles Body"
        rows={30}
        className="mb-5"
        name="content"
        value={formData["content"]}
        onChange={handleChangeOfInput}
      />
      <div className="flex flex-row">
        <div className="flex flex-row">
          <Button
            label={formData["status"] === "draft" ? "Save Draft" : "Publish"}
            onClick={() => {}}
            style="primary"
            className="bg-indigo-500 rounded-tr-none rounded-br-none"
          />
          <Dropdown
            buttonProps={{
              className: "bg-indigo-500 rounded-tl-none rounded-bl-none",
            }}
            buttonStyle="primary"
            name="status"
            trigger="click"
          >
            <li onClick={() => handleChangeStatus("published")}>Publish</li>
            <li onClick={() => handleChangeStatus("draft")}>Save Draft</li>
          </Dropdown>
        </div>
        <Button
          label="Cancel"
          onClick={() => {}}
          className="text-black ml-4"
          style="link"
        />
      </div>
    </form>
  );
};

export default ArticleForm;
