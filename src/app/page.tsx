'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = () => {
  interface Assignment {
    weight: number;
    pointsGiven: number;
    totalPoints: number;
    grade: string;
    gradePercentage: number;
  }

  const [numAssignments, setNumAssignments] = useState(0);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [overallGrade, setOverallGrade] = useState('');
  const [overallScore, setOverallScore] = useState(0);

  const calculateGrade = (pointsGiven: number, totalPoints: number) => {
    const percentage = (pointsGiven / totalPoints) * 100;
    let grade = '';

    if (percentage >= 89.5) {
      grade = 'A+';
    } else if (percentage >= 84.5) {
      grade = 'A';
    } else if (percentage >= 79.5) {
      grade = 'A-';
    } else if (percentage >= 74.5) {
      grade = 'B+';
    } else if (percentage >= 69.5) {
      grade = 'B';
    } else if (percentage >= 64.5) {
      grade = 'B-';
    } else if (percentage >= 59.5) {
      grade = 'C+';
    } else if (percentage >= 54.5) {
      grade = 'C';
    } else if (percentage >= 49.5) {
      grade = 'C-';
    } else {
      grade = 'D';
    }

    return {
      grade,
      gradePercentage: parseFloat(percentage.toFixed(2)),
    };
  };

  const calculateOverallGrade = () => {
    const totalWeight = assignments.reduce(
      (sum, assignment) => sum + assignment.weight,
      0
    );
    const weightedGrades = assignments.reduce(
      (sum, assignment) =>
        sum + assignment.gradePercentage * (assignment.weight / totalWeight),
      0
    );
    const overallGrade = calculateGrade(weightedGrades, 100);
    setOverallGrade(overallGrade.grade);
    setOverallScore(overallGrade.gradePercentage);
  };

  return (
    <>
      <Header />

      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4'>
        <div className='max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
              AUT Grade Calculator
            </h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Enter your assignment details to calculate your overall grade.
            </p>
          </div>

          <form className='space-y-6'>
            <div>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white'
                htmlFor='numAssignments'
              >
                Number of Assignments
              </label>

              <input
                className='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full'
                type='number'
                id='numAssignments'
                min='0'
                value={numAssignments || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    setNumAssignments(0);
                    setAssignments([]);
                  } else {
                    const parsedValue = parseInt(value);
                    if (parsedValue >= 0) {
                      setNumAssignments(parsedValue);
                      setAssignments(
                        Array(parsedValue).fill({
                          weight: 0,
                          pointsGiven: 0,
                          totalPoints: 0,
                          grade: '',
                          gradePercentage: 0,
                        })
                      );
                    }
                  }
                }}
                placeholder='Enter number of assignments'
              />
            </div>

            <div className='space-y-4'>
              {numAssignments > 0 ? (
                assignments.map((assignment, index) => (
                  <div key={index} className='space-y-2'>
                    <p className='text-white'>Assignment {index + 1}</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                      <div>
                        <label
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white'
                          htmlFor={`assignmentWeight-${index}`}
                        >
                          Weight %
                        </label>
                        <input
                          className='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full'
                          type='number'
                          id={`assignmentWeight-${index}`}
                          min='0'
                          max='100'
                          value={assignment.weight || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setAssignments((prevAssignments) => {
                              const updatedAssignments = [...prevAssignments];
                              updatedAssignments[index] = {
                                ...updatedAssignments[index],
                                weight: value,
                              };
                              return updatedAssignments;
                            });
                          }}
                          placeholder='50'
                        />
                      </div>
                      <div>
                        <label
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white'
                          htmlFor={`assignmentPointsGiven-${index}`}
                        >
                          Points Given
                        </label>
                        <input
                          className='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full'
                          type='number'
                          id={`assignmentPointsGiven-${index}`}
                          min='0'
                          value={assignment.pointsGiven || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setAssignments((prevAssignments) => {
                              const updatedAssignments = [...prevAssignments];
                              const { grade, gradePercentage } = calculateGrade(
                                value,
                                updatedAssignments[index].totalPoints
                              );
                              updatedAssignments[index] = {
                                ...updatedAssignments[index],
                                pointsGiven: value,
                                grade,
                                gradePercentage,
                              };
                              return updatedAssignments;
                            });
                          }}
                          placeholder='80'
                        />
                      </div>
                      <div>
                        <label
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white'
                          htmlFor={`assignmentTotalPoints-${index}`}
                        >
                          Total Points
                        </label>
                        <input
                          className='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full'
                          type='number'
                          id={`assignmentTotalPoints-${index}`}
                          min='0'
                          value={assignment.totalPoints || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setAssignments((prevAssignments) => {
                              const updatedAssignments = [...prevAssignments];
                              const { grade, gradePercentage } = calculateGrade(
                                updatedAssignments[index].pointsGiven,
                                value
                              );
                              updatedAssignments[index] = {
                                ...updatedAssignments[index],
                                totalPoints: value,
                                grade,
                                gradePercentage,
                              };
                              return updatedAssignments;
                            });
                          }}
                          placeholder='100'
                        />
                      </div>
                      <div>
                        <label
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white'
                          htmlFor={`assignmentGrade-${index}`}
                        >
                          Grade
                        </label>
                        <input
                          className='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full'
                          type='text'
                          id={`assignmentGrade-${index}`}
                          value={assignment.grade || ''}
                          placeholder='A-'
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-gray-500 dark:text-gray-400'>
                  Please enter the number of assignments.
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='font-medium text-gray-900 dark:text-gray-100'>
                  Overall Grade:
                </span>
                <span className='font-bold text-2xl text-primary'>
                  {overallGrade}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='font-medium text-gray-900 dark:text-gray-100'>
                  Overall Score:
                </span>
                <span className='font-bold text-2xl text-primary'>
                  {overallScore.toFixed(2)}%
                </span>
              </div>
            </div>

            <button
              className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'
              type='button'
              onClick={calculateOverallGrade}
            >
              Calculate
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
