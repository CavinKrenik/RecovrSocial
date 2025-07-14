import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface CleanDatePickerProps {
  currentDate?: string;
  onSave: (date: string) => void;
  onCancel: () => void;
}

const CleanDatePicker: React.FC<CleanDatePickerProps> = ({ currentDate, onSave, onCancel }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentDate ? new Date(currentDate).getFullYear().toString() : currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentDate ? (new Date(currentDate).getMonth() + 1).toString().padStart(2, '0') : '01');
  const [selectedDay, setSelectedDay] = useState(currentDate ? new Date(currentDate).getDate().toString().padStart(2, '0') : '01');

  const years = [];
  for (let year = 1950; year <= currentYear; year++) {
    years.push(year.toString());
  }

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = [];
  const daysInMonth = getDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth));
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day.toString().padStart(2, '0'));
  }

  // Update day when month or year changes to ensure valid date
  useEffect(() => {
    const maxDays = getDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth));
    if (parseInt(selectedDay) > maxDays) {
      setSelectedDay(maxDays.toString().padStart(2, '0'));
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const handleSave = () => {
    const dateString = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    const selectedDate = new Date(dateString);
    const today = new Date();
    
    if (selectedDate > today) {
      alert('Clean date cannot be in the future');
      return;
    }
    
    onSave(dateString);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Set Clean Date</CardTitle>
          <Button onClick={onCancel} variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Year</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {years.reverse().map((year) => (
                  <SelectItem key={year} value={year} className="text-white hover:bg-slate-700">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">Month</label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value} className="text-white hover:bg-slate-700">
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">Day</label>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {days.map((day) => (
                  <SelectItem key={day} value={day} className="text-white hover:bg-slate-700">
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleSave} className="flex-1 bg-teal-500 hover:bg-teal-600">
              Save Date
            </Button>
            <Button onClick={onCancel} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CleanDatePicker;