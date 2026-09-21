import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label'
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobByText } from '../redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Nashik"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Scientist",
      "DevOps Engineer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-3 LPA", "3-6 LPA", "6-12 LPA", "12-20 LPA", "20+ LPA"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const { searchJobByText } = useSelector(store => store.job);

  const filterHandler = (value) => {
    dispatch(setSearchJobByText(value));
  };

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-lg '>Filter Jobs</h1>
        {searchJobByText && (
          <Button variant="link" className="text-xs h-auto p-0" onClick={() => dispatch(setSearchJobByText(""))}>
            Clear
          </Button>
        )}
      </div>
      <hr className='mt-3' />
      {
        filterData.map((data, index) => {
          return (
            <div key={index} className='mt-3'>
              <h1 className='font-bold text-md'>{data.filterType}</h1>
              <RadioGroup value={searchJobByText} onValueChange={filterHandler}>
                {
                  data.array.map((item, idx) => {
                    const itemId = `filter-${index}-${idx}`;
                    return (
                      <div key={itemId} className='flex items-center space-x-2 my-2 '>
                        <RadioGroupItem value={item} id={itemId} />
                        <Label htmlFor={itemId}>{item}</Label>
                      </div>
                    )
                  })}
              </RadioGroup>
            </div>
          )
        })
      }
    </div>
  )
}

export default FilterCard
