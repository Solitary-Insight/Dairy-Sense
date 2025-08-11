import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Download, NotebookText, Search, X } from 'lucide-react'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SetupStatusKeys } from '@/lib/Utils/App/AppSetupStatusKeys'
import { FarmController } from '@/app/register/controller/Farm.Controller'
import { FarmListShimmer } from '../Shimmer_Loaders/farm-list-shimmer'
import NothingFound from '../nothing-found'
import { FarmListItem } from '@/components/farm-list-item'

// INFO: UTIL FUNCTION TO HANDLE FARM DATA 
function handleFarms(farms) {
    const up_farm = farms.map(farm => ({
        ...farm,
        created_at: new Date(farm.created_at).toLocaleString()
    }));

    return up_farm
}



// INFO handle Data export  
async function exportJsonData(data_to_export){
   await new FarmController().exportFarms({
    farms_data:data_to_export,
    onSuccess:()=>{
        console.log("SUCCESS")
    },onFailed:()=>{
        console.log("FAILURE")
    }
   })
}


export default function FarmList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("*")
    const farm_controller = new FarmController()
    const [farms, setFarms] = useState([])
    const [loading, setLoading] = useState(true)
    const [sorted_farms, setSortedFarm] = useState([])



    // handle Search 
    function handleSearch(value: string, list) {
        setSearchTerm(value)
        if (searchTerm == '') {
            return list
        }
        const searched_list = []
        for (const farm of list) {
            if (JSON.stringify(farm).toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                searched_list.push(farm)
            }
        }

        return searched_list
    }
    // handle Sort 
    function handleSort(value, list) {
        setStatusFilter(value)
        if (value == '*') {
            return list
        }
        const sorted_list = []
        for (const farm of list) {
            if (value === farm.setup_status) {
                // console.log("MATCH : ",statusFilter,farm.setup_status)
                sorted_list.push(farm)
            }
        }
        return sorted_list


    }

    // Clears Filters 
    function clearFIlters() {
        setSearchTerm("")
        setStatusFilter('*')
        updateUI('', "*", farms)
    }
    //update Farm List UI
    function updateUI(searched_value, filter_value, _farms) {
        console.log(searched_value, filter_value)
        const sort_result = handleSort(filter_value,_farms)
        const search_result = handleSearch(searched_value, sort_result)
        setSortedFarm(search_result)


    }

    // TODO : API CALL TO HANDLE FARM GET  
    useEffect(() => {
        farm_controller.getAllFarmsAlongWithOWner(
            {
                onResponse: (message, type) => { console.log(message, type); setLoading(false) },
                onSuccess: ({ farms }) => { setFarms(handleFarms(farms)); setLoading(false); updateUI(searchTerm, statusFilter, farms) }
            })
    }, [])


    function updateFarmItem(item, index) {
        // sorted_farms.map((farm)=>farm.id==item.id?item:farm)
        const updated_farms=[...sorted_farms]
        updated_farms[index]=item
        setFarms(farms.map((farm)=>farm.id==item.id?item:farm))
        updateUI(searchTerm,statusFilter,updated_farms)


    }

    return (

        <Card>
            <CardHeader>
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <CardTitle className="text-lg md:text-xl">Farms</CardTitle>
                        <CardDescription className="text-sm">Manage registered farms and their registration status</CardDescription>
                    </div>
                    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search owners..."
                                value={searchTerm}
                                onChange={(e) => { updateUI(e.target.value, statusFilter, farms); }}
                                className="pl-10 w-full md:w-64"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <Select value={statusFilter} onValueChange={(value) => { updateUI(searchTerm, value, farms) }}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='*'>All</SelectItem>
                                    {SetupStatusKeys.statuses().map(
                                        item => <SelectItem value={item.key}>{item.label}</SelectItem>
                                    )}


                                </SelectContent>
                            </Select>
                            <Button onClick={()=>{exportJsonData(sorted_farms)}} className="bg-green-600 hover:bg-green-700 hidden md:flex">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Button onClick={()=>{exportJsonData(sorted_farms)}} size="sm" className="bg-green-600 hover:bg-green-700 md:hidden">
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 md:space-y-4">
                    {loading &&
                        [1, 2, 3].map((_) => <FarmListShimmer></FarmListShimmer>)}
                    {(sorted_farms.length == 0 && !loading) && <NothingFound LeadingIcon={<NotebookText></NotebookText>} title='No Farm Found' showRetry={false} actionLabel='Clear Filters' ActionIcon={<X />} onAction={(searchTerm == '' && statusFilter == "*") ? null : () => { clearFIlters() }} description='Sorry! currently you have no farm to show. ' />}
                    {sorted_farms.map((farm, index) => (
                        <FarmListItem onUpdate={(item) => { updateFarmItem(item, index) }} farm={farm} />
                    ))}
                </div>
            </CardContent>
        </Card>

    )
}
