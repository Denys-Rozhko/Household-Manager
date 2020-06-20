<template>
	<table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{"Amount"}}</th>
      <th>{{"Date" | localize}}</th>
      <th>{{"Category" | localize}}</th>
      <th>{{"Type" | localize}}</th>
      <th>{{"Open" | localize}}</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(record, index) of records"
      :key="record.id"
    >
      <td>{{ index + 1 }}</td>
      <td>{{ record.amount | currency }}</td>
      <td>{{ processDate(record.date) | dateTimeFormat("datetime")}}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span 
          class="white-text badge"
          :class="[record.typeClass]"
        >{{record.typeText}}</span>
      </td>
      <td>
        <button 
          class="btn-small btn" 
          @click="$router.push(`detail-record/${record.id}`)"
          v-tooltip="'Просмотр записи'"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style lang="less" scoped>
@media only screen and (max-width: 560px)  {
  tr {
    display: flex;
    flex-direction: column;
  }
}
</style>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    }
  },
  methods: {
    processDate(date) {
      date = date.slice(1, date.length - 1); // \"dfdfd\" => dfdfd 
      return date;
    }
  }
}
</script>